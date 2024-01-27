import { Link, useRouteLoaderData } from "react-router-dom";
import ElementModel from "../models/element";
import classes from "./ElementsList.module.css";

interface ElementsListProps {
  elements: ElementModel[];
  children?: React.ReactNode;
}

const ElementsList: React.FC<ElementsListProps> = (props) => {
  const data: any = useRouteLoaderData("root");

  return (
    <div>
      <div className={classes.elements}>
        <ul className={classes.list}>
          {props.elements.map((element: ElementModel) => (
            <li key={element._id} className={classes.item}>
              <Link to={element._id} className={classes.content}>
                <h4>{element.name}</h4>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {data && data.user && (
        <div className={classes.new}>
          <Link to="new">+ New Element</Link>
        </div>
      )}
    </div>
  );
};

export default ElementsList;
