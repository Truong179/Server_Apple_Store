const OrderModel = require("../models/order.model");
const listTabs = [
  { status: "Đang xử lý" },
  { status: "Đang vận chuyển" },
  { status: "Đã giao" },
  { status: "Đã hủy" },
];

exports.listOrder = async (req, res, next) => {
  try {
    let { role, userId } = req.query;
    let body = {};

    for (const listTab of listTabs) {
      const tabName = listTab.status;
      if (role === "Shop") {
        // Nếu là admin, trả về toàn bộ danh sách
        body[tabName] = await OrderModel.Order.find({
          status: tabName,
        }).populate(["userId", "productId"]);
      } else {
        // Nếu là user, trả về danh sách theo userId của người đó
        body[tabName] = await OrderModel.Order.find({
          userId,
          status: tabName,
        }).populate("productId");
      }
    }

    res.json({ status: true, message: body });
  } catch (error) {
    console.error(error);
    res.json({ status: false, message: error.message });
  }
};

exports.addOrder = async (req, res, next) => {
  try {
    const newOrder = new OrderModel.Order(req.body);

    const savedOrder = await newOrder.save();

    res.json({ status: true, message: savedOrder });
  } catch (error) {
    console.error(error);
    res.json({ status: false, message: error.message });
  }
};

exports.updateOrder = async (req, res, next) => {
  const { updateAll } = req.body;
  console.log(req.query);

  try {
    if (updateAll) {
      await OrderModel.Order.updateMany({ status: "Đang xử lý" }, req.body);
      res.json({
        status: true,
        message: [],
      });
    } else {
      const idOrder = req.params.idOrder;

      const result = await OrderModel.Order.findByIdAndUpdate(
        idOrder,
        req.body
      );
      res.json({ status: true, message: result });
    }
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

exports.getOrderStatistics = async (req, res, next) => {
  try {
    const statistics = {};

    // Lấy doanh thu ngày
    const dailyRevenue = await calculateDailyRevenue();
    statistics.dailyRevenue = dailyRevenue;

    // Lấy số lượng đơn hàng, đơn hàng đã hủy
    const orderCounts = await getOrderCounts();
    statistics.orderCount = orderCounts.orderCount;
    statistics.cancelCount = orderCounts.cancelCount;

    // Lấy số lượng đơn hàng theo trạng thái
    const orderStatusCounts = await getOrderStatusCounts();
    statistics.orderStatusCounts = orderStatusCounts;

    res.json({ status: true, message: statistics });
  } catch (error) {
    console.error(error);
    res.json({ status: false, message: error.message });
  }
};

const startOfDay = new Date();
startOfDay.setHours(0, 0, 0, 0);

const endOfDay = new Date();
endOfDay.setHours(23, 59, 59, 999);

async function calculateDailyRevenue() {
  try {
    // Lấy tất cả đơn hàng có trạng thái "Đã giao" được tạo trong ngày
    const orders = await OrderModel.Order.find({
      status: "Đã giao",
      createdAt: {
        $gte: startOfDay, // Lớn hơn hoặc bằng thời điểm bắt đầu
        $lte: endOfDay, // Nhỏ hơn hoặc bằng thời điểm kết thúc
      },
    });

    // Tính tổng giá trị của các đơn hàng
    const dailyRevenue = orders.reduce((totalRevenue, order) => {
      return totalRevenue + order.totalPrice;
    }, 0);

    return `${dailyRevenue} Đ`;
  } catch (error) {
    throw error;
  }
}

async function getOrderCounts() {
  try {
    // Lấy số lượng đơn hàng và đơn hàng đã hủy từ cơ sở dữ liệu
    const orderCount = await OrderModel.Order.countDocuments({
      status: { $in: ["Đang xử lý", "Đang vận chuyển", "Đã giao"] },
      createdAt: {
        $gte: startOfDay, // Lớn hơn hoặc bằng thời điểm bắt đầu
        $lte: endOfDay, // Nhỏ hơn hoặc bằng thời điểm kết thúc
      },
    });

    const cancelCount = await OrderModel.Order.countDocuments({
      status: "Đã hủy",
      createdAt: {
        $gte: startOfDay, // Lớn hơn hoặc bằng thời điểm bắt đầu
        $lte: endOfDay, // Nhỏ hơn hoặc bằng thời điểm kết thúc
      },
    });

    return { orderCount, cancelCount };
  } catch (error) {
    throw error;
  }
}

async function getOrderStatusCounts() {
  try {
    const orderStatusCounts = {};

    for (const tab of listTabs) {
      const tabName = tab.status;

      const count = await OrderModel.Order.countDocuments({
        status: tabName,
      });

      orderStatusCounts[tabName] = count;
    }

    return { orderStatusCounts };
  } catch (error) {
    throw error;
  }
}
