import React, { useEffect, useState } from "react";
import styles from "../styles/navbar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import { ModalMenu } from "./Modals";
import { Modal } from "@mui/material";
import Link from "next/link";

export default function Header(): JSX.Element {
  const [color, setColor] = useState(false);
  const [menu, setMenu] = useState(false);

  function menuClick() {
    setMenu(true);
    if (menu) {
      setMenu(false);
    }
  }

  const scrollColor = () => {
    if (window.scrollY >= 10) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollColor);
  }, []);
  return (
    <div>
      <div className={color ? `${styles.navbar}` : `${styles.navbarDefault}`}>
        <div className="flex mx-8 justify-between md:m-0 md:justify-around items-center h-full">
          <button className="text-white text-4xl md:hidden" onClick={menuClick}>
            <MenuIcon
              className={color ? `${styles.a}` : `${styles.aDefault}`}
            />
          </button>
          <nav className="w-3/4 hidden md:block">
            <div>
              <ul className="flex justify-around text-white">
                <li>
                  <Link
                    href="/"
                    className={color ? `${styles.a}` : `${styles.aDefault}`}
                  >
                    Нүүр хуудас
                  </Link>
                </li>
                <li>
                  <Link
                    href="/checkingMenu"
                    className={color ? `${styles.a}` : `${styles.aDefault}`}
                  >
                    Меню
                  </Link>
                </li>
                <li>
                  <Link
                    href="/BookingTableData"
                    className={color ? `${styles.a}` : `${styles.aDefault}`}
                  >
                    Ширээ захиалга
                  </Link>
                </li>
                <li>
                  <Link
                    href="/checkingOrder"
                    className={color ? `${styles.a}` : `${styles.aDefault}`}
                  >
                    Захиалга шалгах
                  </Link>
                </li>
                <li>
                  <Link
                    href="AboutUs"
                    className={color ? `${styles.a}` : `${styles.aDefault}`}
                  >
                    Бидний тухай
                  </Link>
                </li>
                <li>
                  <Link href="/BookingTableCheckLogin">
                    <button>Нэвтрэх</button>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <Modal
            open={menu}
            onClose={() => setMenu(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="flex justify-end items-center"
          >
            <ModalMenu />
          </Modal>
        </div>
      </div>
    </div>
  );
}
