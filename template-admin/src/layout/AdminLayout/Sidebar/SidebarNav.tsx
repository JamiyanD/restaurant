import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronUp,
  faLocationArrow,
  faPencil,
  faPuzzlePiece,
  faPlusSquare,
  faList,
  faAddressBook,
} from "@fortawesome/free-solid-svg-icons";
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Accordion,
  AccordionContext,
  Button,
  Nav,
  useAccordionButton,
} from "react-bootstrap";
import classNames from "classnames";
import Link from "next/link";

type SidebarNavItemProps = {
  href: string;
  icon?: IconDefinition;
} & PropsWithChildren;

const SidebarNavItem = (props: SidebarNavItemProps) => {
  const { icon, children, href } = props;

  return (
    <Nav.Item>
      <Link href={href} passHref legacyBehavior>
        <Nav.Link className="px-3 py-2 d-flex align-items-center">
          {icon ? (
            <FontAwesomeIcon className="nav-icon ms-n3" icon={icon} />
          ) : (
            <span className="nav-icon ms-n3" />
          )}
          {children}
        </Nav.Link>
      </Link>
    </Nav.Item>
  );
};

const SidebarNavTitle = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <li className="nav-title px-3 py-2 mt-3 text-uppercase fw-bold">
      {children}
    </li>
  );
};

type SidebarNavGroupToggleProps = {
  eventKey: string;
  icon: IconDefinition;
  setIsShow: (isShow: boolean) => void;
} & PropsWithChildren;

const SidebarNavGroupToggle = (props: SidebarNavGroupToggleProps) => {
  const { activeEventKey } = useContext(AccordionContext);
  const { eventKey, icon, children, setIsShow } = props;

  const decoratedOnClick = useAccordionButton(eventKey);

  const isCurrentEventKey = activeEventKey === eventKey;

  useEffect(() => {
    setIsShow(activeEventKey === eventKey);
  }, [activeEventKey, eventKey, setIsShow]);

  return (
    <Button
      variant="link"
      type="button"
      className={classNames(
        "rounded-0 nav-link px-3 py-2 d-flex align-items-center flex-fill w-100 shadow-none",
        {
          collapsed: !isCurrentEventKey,
        },
      )}
      onClick={decoratedOnClick}
    >
      <FontAwesomeIcon className="nav-icon ms-n3" icon={icon} />
      {children}
      <div className="nav-chevron ms-auto text-end">
        <FontAwesomeIcon size="xs" icon={faChevronUp} />
      </div>
    </Button>
  );
};

type SidebarNavGroupProps = {
  toggleIcon: IconDefinition;
  toggleText: string;
} & PropsWithChildren;

const SidebarNavGroup = (props: SidebarNavGroupProps) => {
  const { toggleIcon, toggleText, children } = props;

  const [isShow, setIsShow] = useState(false);

  return (
    <Accordion
      as="li"
      bsPrefix="nav-group"
      className={classNames({ show: isShow })}
    >
      <SidebarNavGroupToggle
        icon={toggleIcon}
        eventKey="0"
        setIsShow={setIsShow}
      >
        {toggleText}
      </SidebarNavGroupToggle>
      <Accordion.Collapse eventKey="0">
        <ul className="nav-group-items list-unstyled">{children}</ul>
      </Accordion.Collapse>
    </Accordion>
  );
};

export default function SidebarNav() {
  return (
    <ul className="list-unstyled">
      <SidebarNavTitle>Users</SidebarNavTitle>

      <SidebarNavGroup toggleText="Staff" toggleIcon={faAddressBook}>
        <SidebarNavItem icon={faList} href="/staff/staffList">
          Staff list
        </SidebarNavItem>
        <SidebarNavItem icon={faPlusSquare} href="/staff/staff-register">
          Add staff
        </SidebarNavItem>
      </SidebarNavGroup>
      <SidebarNavGroup toggleIcon={faPencil} toggleText="User management">
        <SidebarNavItem href="/users/usersList">Users</SidebarNavItem>
        <SidebarNavItem href="/users/add">Add User</SidebarNavItem>
      </SidebarNavGroup>
      <SidebarNavTitle> Orders</SidebarNavTitle>
      <SidebarNavGroup
        toggleIcon={faPuzzlePiece}
        toggleText=" Table management"
      >
        <SidebarNavItem href="/table/order">Table orders</SidebarNavItem>
        <SidebarNavItem href="/table/add">Add order</SidebarNavItem>
      </SidebarNavGroup>

      <SidebarNavGroup
        toggleIcon={faPuzzlePiece}
        toggleText=" Order management"
      >
        <SidebarNavItem href="/order/orderList">Food orders</SidebarNavItem>
        <SidebarNavItem href="/order/add">Add order</SidebarNavItem>
      </SidebarNavGroup>

      <SidebarNavGroup
        toggleIcon={faPuzzlePiece}
        toggleText=" Food management"
      >
        <SidebarNavItem href="/foods/foodList">Foods</SidebarNavItem>
        <SidebarNavItem href="/foods/add">Add food</SidebarNavItem>
      </SidebarNavGroup>

    </ul>
  );
}
