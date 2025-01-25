import React, { useState } from "react";
import { Input, Button } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Cart from "../product/Cart";

const Navbar = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 28px",
        backgroundColor: "#004b6b",
        flexWrap: "wrap",
      }}
    >
      {/* Search Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <Input
          placeholder="Search any things"
          style={{
            borderRadius: "20px 0 0 20px",
            padding: "8px 16px",
            border: "none",
            height: "40px",
            flex: 1,
          }}
        />
        <Button
          type="primary"
          style={{
            borderRadius: "0 20px 20px 0",
            backgroundColor: "#f8a900",
            border: "none",
            color: "#fff",
            height: "40px",
            padding: "0 24px",
          }}
        >
          Search
        </Button>
      </div>

      {/* Right Icons */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          color: "#fff",
          flexShrink: 0,
        }}
      >
        {/* Wishlist */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <HeartOutlined style={{ fontSize: "20px", color: "#fff" }} />
          <span
            style={{
              fontSize: "14px",
              color: "#fff",
              backgroundColor: "#f8a900",
              borderRadius: "12px",
              padding: "0 8px",
              lineHeight: "20px",
            }}
          >
            2
          </span>
          <span style={{ fontSize: "14px", color: "#fff" }}>Sign In</span>
        </div>

        {/* Cart */}
        <div 
          style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
          onClick={() => setCartOpen(true)}
        >
          <ShoppingCartOutlined style={{ fontSize: "20px", color: "#fff" }} />
          <span
            style={{
              fontSize: "14px",
              color: "#fff",
              backgroundColor: "#f8a900",
              borderRadius: "12px",
              padding: "0 8px",
              lineHeight: "20px",
            }}
          >
            5
          </span>
          <span style={{ fontSize: "14px", color: "#fff" }}>Cart</span>
        </div>
      </div>

      {/* Cart Component */}
      <Cart open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

export default Navbar;
