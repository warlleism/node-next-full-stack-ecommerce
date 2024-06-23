'use client'

import { useState } from "react";
import { Header } from "../components/header/page";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import './style.scss';

export default function Cart() {
    const [itens, setItens] = useState([
        { id: 1, name: 'teste1' },
        { id: 2, name: 'teste2' },
        { id: 3, name: 'teste3' },
        { id: 4, name: 'teste4' },
    ]);

    const remove = (id: any) => {
        setItens((prevItens) => prevItens.filter(item => item.id !== id));
    };

    const add = () => {
        const newItem = {
            id: itens.length + 1,
            name: `teste${itens.length + 1}`
        };

        setItens(prevItens => [...prevItens, newItem]);
    };

    return (
        <>
            <Header />
            <button onClick={() => add()}>Adicionar</button>
            <TransitionGroup component="ul" className="item-list">
                {itens.map((item) => (
                    <CSSTransition
                        key={item.id}
                        classNames="item"
                        timeout={500}>
                        <li key={item.id}>
                            {item.name}
                            <button onClick={() => remove(item.id)}>Remove</button>
                        </li>
                    </CSSTransition>
                ))}
            </TransitionGroup >
        </>
    );
}
