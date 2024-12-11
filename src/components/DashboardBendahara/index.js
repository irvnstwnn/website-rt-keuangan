import React, { useState, useEffect } from 'react';

import imgControl from '../../assets/images/control.png'
import imgAdmin from '../../assets/images/shield_person.png'
import iconKeuangan from '../../assets/images/icon-keuangan.png'
import { Outlet, useNavigate } from 'react-router-dom';

const DashboardBendahara = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(true);
  const [index, setIndex] = useState(null);

  const Menus = [
    { icon:iconKeuangan ,  title: "Keuangan",  link: "/dashboardbendahara/keuangan/listkeuangan" },
  ];

  const handleClick = (i) => {
    setIndex(i === index ? null : i); // Toggle item yang diklik
  };
  const marginTop = {
    marginTop: '50px'
  };

  return (
    <div className="flex" style={marginTop}>
      <div
        className={`${
          open ? "w-72" : "w-20 "
        } bg-primary min-h-screen p-5 pt-8 relative duration-300`}
      >
        <img
          src={imgControl}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-primary
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="text-3xl flex gap-x-4 items-center w-60">
          <img
            src={imgAdmin}
            alt=""
            width={40}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`cursor-pointer text-white origin-left font-medium duration-200 ${
              !open && "scale-0"
            }`}
            style={{fontSize: 15}}
            onClick={() => {
              navigate("/dashboardbendahara/bendahara")
              setIndex(null)
            }}
          >
            Dashboard Bendahara
          </h1>
        </div>
        <ul className="pt-6">
        {Menus.map((Menu, i) => (
          <li
            onClick={() => {
              handleClick(i)
              navigate(Menu.link)
            }
            }
            key={i}
            className={`${
              index === i ? 'bg-secondary font-bold text-white' : 'font-semibold'
            } flex rounded-md p-2 cursor-pointer text-gray-300 hover:bg-secondary hover:text-white text-sm items-center gap-x-4 
            ${Menu.gap ? "mt-9" : "mt-2"} ${i === 0 && "bg-light-white"}`}
          >
            <img src={Menu.icon} style={{ width: '20px' }} />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              {Menu.title}
            </span>
          </li>
          ))}
        </ul>
      </div>
      <div className="min-h-screen flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardBendahara;