import React,{useState,useRef} from "react";
import "../styles/main.css";

export default function Main(){
    let [items,setItems] = useState([]);
    let refname=useRef();
    let refdate=useRef();
    let [id,setId] = useState(0);

    function handleSubmit(e){
        e.preventDefault();
        let name = e.target.name.value;
        let date = e.target.date.value;
        if(name !== "" && date !== "") {
            setItems(prev=>[...prev,{id:id,name:name,date:date}])
            setId(prev=>prev+1);
            e.target.name.value = "";
            e.target.date.value = "";
        }
    }

    function handleDelete(id){
        let newitems = items.filter((item) => item.id!==id);
        setItems(newitems);
    }

    function handleUpdate(id){
        let newitems = items.filter((item) => item.id===id);
        handleDelete(id);
        refname.current.value = newitems[0].name;
        refdate.current.value = newitems[0].date;
    }

    return (
        <div className="main">
            <div className="mainbox">
                <div className="header">
                    <h1>Todo</h1>
                </div>
                <div className="inputbox">
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="name" ref={refname} />
                        <input type="date" name="date" ref={refdate} />
                        <button type="submit">Add</button>
                    </form>
                </div>
                <div className="itemsbox">
                    {items.map((item)=>(
                        <div className="item" key={item.id}>
                            <div className="check">
                                <input type="checkbox" />
                            </div>
                            <div className="matter">
                                <p>{item.name}</p>
                                <span>Date: {item.date}</span>
                            </div>
                            <div className="buttons">
                                <button onClick={()=>handleDelete(item.id)}>D</button>
                                <button onClick={()=>handleUpdate(item.id)}>U</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="footer">
                    <p>@AravindReddyGudi</p>
                </div>
            </div>
        </div>
    )
}