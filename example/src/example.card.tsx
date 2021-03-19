import React, { useReducer, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark as style } from 'react-syntax-highlighter/dist/esm/styles/prism';
import jsxToString from 'jsx-to-string';

interface Props {
    title: string
    description: string
    code: JSX.Element
}

const ExampleCard: React.FunctionComponent<Props> = ({ title, description, code }: Props) => {

    /**
     * retourne l'élément correspondant à la tab cliquée et rend actif la tab cliquée
     * @param state l'état du reducer
     * @param tab la valeur de la tab cliquée
     * @returns le composant à afficher
     */
    function contentReducer(state: JSX.Element, tab: string): JSX.Element {
        let content;

        switch (tab) {
            case 'description':
                content = description;
                break;
            case 'demo':
                content = code;
                break;
            case 'code':
                content = <SyntaxHighlighter language="javacript" style={style}>
                    {jsxToString(code).replace('<r', '<Text').replace('</r>', '</Text>')}
                </SyntaxHighlighter>;
                break;
            default:
                content = '';

        }
        setIsActive(tab);
        return <div className="content">{content}</div>
    }

    //l'état de la tab active
    const [isActive, setIsActive] = useState<string>('description');
    //le contenu à afficher selon la tab cliquée
    const [content, dispatch] = useReducer(contentReducer, <></>);

    return <div className="card">

        <header className="card-header">
            <p className="card-header-title uppercase">{title}</p>
            <span className="icon card-header-icon">
                <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
        </header>

        <div className="tabs">
            <ul>
                <li className={isActive === 'description' ? 'is-active' : ''}
                    onClick={() => dispatch('description')}
                >
                    <a>Description</a>
                </li>
                <li className={isActive === 'demo' ? 'is-active' : ''}
                    onClick={() => dispatch('demo')}
                >
                    <a>Demo</a>
                </li>
                <li className={isActive === 'code' ? 'is-active' : ''}
                    onClick={() => dispatch('code')}
                >
                    <a>Code</a>
                </li>
            </ul>
        </div>

        <div className="card-content">
            <div className="content">{content}</div>
        </div>

    </div>
}

export default ExampleCard;
