// node_modules
import { Link } from "react-router-dom";

// consts
import { PATH } from "../../consts";

const HeaderComponent = () => {
    return (
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
                <Link to={PATH.Dashboard}>
                    <span className="sr-only">Workflow</span>
                    <img
                        className="h-8 w-auto sm:h-10"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt=""
                    />
                </Link>
            </div>
        </div>
    );
};

export default HeaderComponent;
