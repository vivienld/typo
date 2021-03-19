import React, { useReducer, useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark as style } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Box, Tabs, Tab, AppBar, Accordion, AccordionSummary, Typography, AccordionDetails } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import jsxToString from 'jsx-to-string';

import styles from './styles.module.scss'

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
                content = description;

        }
        setIsActive(tab);
        return <div className="content">{content}</div>
    }

    //l'état de la tab active
    const [isActive, setIsActive] = useState<string>('description');
    //le contenu à afficher selon la tab cliquée
    const [content, dispatch] = useReducer(contentReducer, <></>);

    useEffect(() => {
        dispatch('description')
    }, [])

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography className={styles.title}>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box width={"100%"}>
                    <AppBar position="static" color="transparent">
                        <Tabs value={isActive} onChange={(event, value) => dispatch(value)} aria-label="simple tabs example">
                            <Tab label="Description" value="description" />
                            <Tab label="Demo" value="demo" />
                            <Tab label="Code" value="code" />
                        </Tabs>
                    </AppBar>

                    <Box margin={"1rem"}>
                        <div className="content">{content}</div>
                    </Box>

                </Box>
            </AccordionDetails>
        </Accordion>

    )
}

export default ExampleCard;
