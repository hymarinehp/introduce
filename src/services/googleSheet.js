// Cấu hình URL Web App Google Apps Script của bạn tại đây
export const GOOGLE_SHEET_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxCT3-gHusnPVG1mP9cBB4jrl9EMc0B9VLMQmGeun_32tqkJ48fKPcxOSSuQ-xV3cV-/exec";

/**
 * Gửi dữ liệu yêu cầu báo giá tới Google Sheet thông qua Google Apps Script Web App
 * @param {Object} data - Dữ liệu form nhập từ khách hàng
 */
export const sendQuoteToGoogleSheet = async (data) => {
  if (
    !GOOGLE_SHEET_WEB_APP_URL ||
    GOOGLE_SHEET_WEB_APP_URL === "DANG_CAP_NHAT_URL_GOOGLE_APPS_SCRIPT"
  ) {
    console.warn("Chưa cấu hình GOOGLE_SHEET_WEB_APP_URL trong src/services/googleSheet.js");
    return false;
  }

  try {
    const payload = JSON.stringify({
      timestamp: new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
      name: data.name || "",
      phone: data.phone ? `'${String(data.phone).trim()}` : "",
      vesselName: data.vesselName || "",
      email: data.email || "",
      portLocation: data.portLocation || "",
      serviceType: data.serviceType || (data.product ? data.product.name : ""),
      urgency: data.urgency || "",
      itemDetails: data.itemDetails || data.message || ""
    });

    await fetch(GOOGLE_SHEET_WEB_APP_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain"
      },
      body: payload
    });

    return true;
  } catch (error) {
    console.error("Lỗi khi gửi dữ liệu sang Google Sheet:", error);
    return false;
  }
};
