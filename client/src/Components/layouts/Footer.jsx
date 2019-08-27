import React from "react";


export default function Footer() {
  const styles = {
    footerBG: {
      height: "auto",
      backgroundColor: "#218838",
      padding: "5rem"
    },
    content: {
      color: "#fff",
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      margin: "auto"
    },
    icons: {
      width: "2rem",
      marginRight: "1rem"
    },
    contact: {},
    information: {},
    xedike: {},
    help: {}
  };
  return (
    <div style={styles.footerBG}>
      <div style={styles.content} className="container">
        <div style={styles.contact} className="">
          <img
            style={{ width: "300px", marginBottom: "2rem" }}
            src="./logoFooter.png"
            alt=""
          />
          <div style={{ marginTop: "1rem" }}>
            <img
              style={{ width: "1.2rem", position: "absolute" }}
              src="./images/icons/phone.png"
              alt=""
            />
            <p style={{ marginLeft: "2rem" }} className="h6">
              Hỗ trợ hành khách: 0905 93 34 53{" "}
            </p>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <img
              style={{ width: "1.2rem", position: "absolute" }}
              src="./images/icons/phone.png"
              alt=""
            />
            <p style={{ marginLeft: "2rem" }} className="h6">
              Hỗ trợ tài xế: 0905 93 34 53{" "}
            </p>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <img
              style={{ width: "1.2rem", position: "absolute" }}
              src="./images/icons/Mail.png"
              alt=""
            />
            <p style={{ marginLeft: "2rem" }} className="h6">
              Email: cs@xedike.vn{" "}
            </p>
          </div>
          <div style={{ margin: "2rem 0" }}>
            <p className="h5">Somewhere else:</p>
            <a href="https:/facebook.com" target="blank">
              <img
                style={styles.icons}
                src="./images/icons/Facebook.png"
                alt=""
              />
            </a>
            <a href="https://twitter.com/?lang=vi" target="blank">
              <img
                style={styles.icons}
                src="./images/icons/twitter.png"
                alt=""
              />
            </a>
            <a href="https://www.linkedin.com/" target="blank">
              <img
                style={styles.icons}
                src="./images/icons/LinedIn.png"
                alt=""
              />
            </a>
          </div>
        </div>
        <div style={styles.information} className="">
          <p className="h5"> Thông Tin: </p>
          <ul className="pl-0 list-unstyled">
            <li className="py-1">Liên Hệ</li>
            <li className="py-1">Đội Ngũ</li>
            <li className="py-1">Tuyển Dụng</li>
            <li className="py-1">Những Câu Hỏi Thường Gặp</li>
          </ul>
        </div>
        <div style={styles.xedike} className="">
          <p className="h5"> Xe Đi Ké: </p>
          <ul className="pl-0 list-unstyled">
            <li className="py-1">Điều Khoản Sử Dụng</li>
            <li className="py-1">Chính Sách Bảo Mật Thông Tin</li>
            <li className="py-1">Quy Chế Sàn Giao Dịch</li>
            <li className="py-1">Cơ Chế Giải Quyết Tranh Chấp</li>
          </ul>
        </div>
        <div style={styles.help} className="">
          <p className="h5"> Hỗ Trợ: </p>
          <ul className="pl-0 list-unstyled">
            <li className="py-1">Đăng Ký Làm Tài Xế</li>
            <li className="py-1">Đăng Ký Làm Hành Khách</li>
            <li className="py-1">Hành Lý Thất Lạc</li>
            <li className="py-1">Điều Kiện Huỷ</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
