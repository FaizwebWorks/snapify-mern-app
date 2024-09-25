import Home from "../assets/icons/Home.jsx";
import Search from "../assets/icons/Search.jsx";
import Explore from "../assets/icons/Explore.jsx";
import Notification from "../assets/icons/Heart.jsx";
import Message from "../assets/icons/Message.jsx";
import Create from "../assets/icons/Plus.jsx";

const items = [
  {
    name: "Home",
    icon: <Home />,
  },
  {
    name: "Search",
    icon: <Search />,
  },
  {
    name: "Explore",
    icon: <Explore />,
  },
  {
    name: "Notifications",
    icon: <Notification />,
  },
  {
    name: "Messages",
    icon: <Message />,
  },
  {
    name: "Create",
    icon: <Create />,
  },
];

const LeftSidebar = () => {
  return (
    <div>
      <h1>LeftSidebar</h1>
      <div>
        {items.map((item) => (
          <div key={item.name}>
            <div className="flex items-center gap-3">
              {item.icon}
              <div>
                <p>{item.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
