import React from "react";
import "./Settings.css";
import { TbChevronRight } from "react-icons/tb";
import { MdOutlineLock, MdOutlinePersonOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import DesktopHeader from "../../components/DesktopHeader";
import Sidebar from "../../components/Sidbar";

const SettingsContent = () => {
  const navigate = useNavigate();

  const items = [
    {
      group: "Profile",
      rows: [
        {
          icon: <MdOutlinePersonOutline size={20} />,
          label: "Change Username or Address",
          sub: "Update your display name and location",
          color: "#2563eb",
          bg: "#eff6ff",
          onClick: () => navigate("/dash/settings/update_details"),
        },
      ],
    },
    {
      group: "Security",
      rows: [
        {
          icon: <MdOutlineLock size={20} />,
          label: "Update Password",
          sub: "Change your account password",
          color: "#0f172a",
          bg: "#f1f5f9",
          onClick: () => navigate("/dash/settings/edit_password"),
        },
      ],
    },
  ];

  return (
    <section className="settings_wrapper">
      <h1 className="settings_title">Settings</h1>

      {items.map((group) => (
        <div key={group.group} className="settings_group">
          <p className="settings_group_label">{group.group}</p>
          <div className="settings_card">
            {group.rows.map((row, i) => (
              <button
                key={row.label}
                className="settings_row"
                onClick={row.onClick}
                style={{
                  borderTop: i > 0 ? "1px solid #f1f5f9" : "none",
                }}
              >
                <div
                  className="settings_row_icon"
                  style={{ background: row.bg, color: row.color }}
                >
                  {row.icon}
                </div>
                <div className="settings_row_text">
                  <span className="settings_row_label">{row.label}</span>
                  <span className="settings_row_sub">{row.sub}</span>
                </div>
                <TbChevronRight className="settings_row_chevron" />
              </button>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

const Settings = () => {
  return (
    <>
      {/* Mobile */}
      <div className="bank_dashbaord">
        <SettingsContent />
      </div>
      {/* Desktop */}
      <div className="bank_desktop_dashboard">
        <Sidebar />
        <div className="bank_desktop_dashboard_body">
          <DesktopHeader />
          <SettingsContent />
        </div>
      </div>
    </>
  );
};

export default Settings;
