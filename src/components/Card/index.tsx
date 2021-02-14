import React from "react";
import "./index.css";

declare var items: any
declare var title: any
declare var subtitle: any

export interface Card {
	title: string;
	subtitle: string;
	item: Array<String>
  }
export const Card: React.SFC<Card> = () => {
	
	return (
		<div className="CardContainer">
			<h2 className="CardTitle">{title}</h2>
			<hr />
            <h2 className="CardSubtitle">{subtitle}</h2>
			<div className="progressbar">
				<div></div>
			</div>
            <ul className='ItemList'>
                <li className='Item'>{items.map((item)=>(<li>{item})</li>))}</li>
                <li className='Item'>{items.map((item)=>(<li>{item})</li>))}</li>
                <li className='Item'>{items.map((item)=>(<li>{item})</li>))}</li>
            </ul>
		</div>
	);
};
