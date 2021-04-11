import React from "react";
import { Link } from "react-router-dom";

import "./NotFoundPage.css";

class NotFoundPage extends React.Component {
  render() {
    return (
      <div className="notfound">
        
        <p
          className="notfound-text"
          style={{
            textAlign: "center",
            fontSize: 48,
            fontWeight: "bold",
            color: "teal",
          }}
        >
          404 - Page Not Found
          <p style={{ textAlign: "center", fontSize: 18 }}>
            La página buscada no existe
          </p>
          <Link to="/">
            <br />

            <p
              style={{
                textAlign: "center",
                fontSize: 30,
                fontWeight: "bold",
                color: "teal",
              }}
            >
              Si me pulsas, volverás a home
            </p>
          </Link>
        </p>
      </div>
    );
  }
}
export default NotFoundPage;
