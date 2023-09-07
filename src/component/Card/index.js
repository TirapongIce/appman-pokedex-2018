import React from 'react';
import { Row, Col } from 'react-grid-system';
import cute from './cute.png';
const CardComponent = ({ item, type, actionID, deleteID }) => {

    const onHandleSTR = (item) => {
        return item.attacks ? (item.attacks.length * 50) + '%' : '0%';
    };
    const onHandleWeak = (item) => {
        return item.attacks ? (item.weaknesses.length * 100 > 100 ? '100%' : item.weaknesses.length * 100 + '%') : '0%';
    };
    const onHandleHappiness = (item) => {
        const hp = parseInt(item.hp) || 0;
        const sumDamage = item.attacks
            ? item.attacks.reduce((accumulator, object) => {
                return accumulator + parseInt(checkSymbols(object.damage) || 0);
            }, 0)
            : 0;

        const sumData = ((hp / 10) + (sumDamage / 10) * 2) / 5;
        return parseInt(sumData);
    };
    const checkSymbols = (str) => {
        const symbols = ['*', '+'];
        for (const symbol of symbols) {
            if (str.includes(symbol)) {
                return str.substring(0, str.length - 1);
            }
        }
        return str;
    };

    const onAddCard = (id) => {
        actionID(id);
    }
    const onDeleteCard = (id) => {
        deleteID(id);
    }

    return (
        <div className='card'>
            <Row>
                <Col md={type ? 4 : 3}  >
                    <img src={item.imageUrl} alt={item.name} className={type ? 'image-main' : 'image-modal'} />
                </Col>

                <Col md={type ? 8 : 9}  >
                    <Row>
                        <Col md={10}>
                            <span className='label-name'>{item.name.toUpperCase()}</span>
                        </Col>
                        <Col md={2} >
                            <h3 className='btn-add-card' onClick={() => type ? onDeleteCard(item.id) : onAddCard(item.id)}>{type ? "X" : 'Add'} </h3>
                        </Col>
                        <Col md={type ? 3 : 2} style={{ marginTop: '10px' }}>
                            {'HP'}
                        </Col>
                        <Col md={type ? 8 : 10} >
                            <div className={type ? 'progress-container-main' : 'progress-container-modal'}   >
                                <div
                                    className='progress-bar'
                                    style={{
                                        width: parseInt(item.hp) ? (parseInt(item.hp) > 100 ? '100%' : parseInt(item.hp) + '%') : '0%',
                                    }}
                                ></div>
                            </div>
                        </Col>
                        <Col md={type ? 3 : 2} style={{ marginTop: '10px' }}>
                            {'STR'}
                        </Col>
                        <Col md={type ? 8 : 10} >
                            <div className={type ? 'progress-container-main' : 'progress-container-modal'}   >
                                <div className='progress-bar' style={{ width: onHandleSTR(item) }}></div>
                            </div>
                        </Col>
                        <Col md={type ? 3 : 2} style={{ marginTop: '10px' }}>
                            {'WEAK'}
                        </Col>
                        <Col md={type ? 8 : 10} >
                            <div className={type ? 'progress-container-main' : 'progress-container-modal'}   >
                                <div className='progress-bar' style={{ width: onHandleWeak(item) }}></div>
                            </div>
                        </Col>
                        <Col sm={12} style={{ marginTop: '10px' }}>
                            {[...Array(onHandleHappiness(item)).keys()].map((item, i) => {
                                return <img src={cute} className={type ? 'happiness-sizer-main' : 'happiness-sizer-modal'} key={i} alt='Cute Icon' />;
                            })}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default CardComponent;
