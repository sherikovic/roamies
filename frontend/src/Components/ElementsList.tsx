import { Link, useRouteLoaderData } from "react-router-dom";
import ElementModel from "../models/element";
import classes from "./ElementsList.module.css";
import { useState } from "react";
import ElementForm from "./ElementForm";

interface ElementsListProps {
  elements: ElementModel[];
  children?: React.ReactNode;
}

const ElementsList: React.FC<ElementsListProps> = (props) => {
  const data: any = useRouteLoaderData("root");
  const [defineElement, setDefineElement] = useState(false);

  const saveElement: () => void = () => {

  }

  return (
    <div>
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
            <span onClick={() => setDefineElement(!defineElement)}>+ New Element</span>
          </div>
        )}
      </div>
      {defineElement && (
        <div className={classes.card_overlay}>
          <div className={classes.overlay_content}>
            <ElementForm method='post' cancelHandler={() => setDefineElement(false)} submitHandler={saveElement} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ElementsList;
