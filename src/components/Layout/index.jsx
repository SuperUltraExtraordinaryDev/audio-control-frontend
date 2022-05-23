// components
import HeaderComponent from "../Header";

const LayoutComponent = ({ children }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <HeaderComponent />
            <main>{children}</main>
        </div>
    );
};

export default LayoutComponent;
