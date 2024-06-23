import { Outlet } from "react-router-dom";
import NavigationBar, { NavigationBarProps } from './NavigationBar'

interface LayoutProps extends NavigationBarProps {

}

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {

    const { handleSearchInputChange } = props;

    return (
        <div className="site-wrapper">
            <NavigationBar handleSearchInputChange={handleSearchInputChange} />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;