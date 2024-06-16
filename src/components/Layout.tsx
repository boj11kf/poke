import { Outlet } from "react-router-dom";
import NavigationBar from './NavigationBar'

const Layout = () => {
    return (
        <div className="site-wrapper">
            <NavigationBar />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;