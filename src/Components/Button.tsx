import React from 'react';

type ButtonProps = {
    name:string
    callback: ()=>void
}


export const Button = (props:ButtonProps) => {
    const onClickHandler=()=>{
        props.callback()
    }
    return (


        <button onClick={onClickHandler}>{props.name}</button>
    );
};

