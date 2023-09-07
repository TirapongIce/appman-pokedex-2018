import React, { useState, useEffect } from 'react';
import CustomModal from '../component/modal';
import axios from 'axios';
import search from '../search.png';
import { Row, Col, Container } from 'react-grid-system';
import CardComponent from '../component/Card';

function PokedexList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardList, setCardList] = useState([]);
  const [cardModalList, setCardModalList] = useState([]);
  const [actionID, setActionID] = useState("");
  const [deleteID, setDeleteID] = useState("");
  const [masterData, setMasterData] = useState([]);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const LoadData = async () => {
    try {
      const response = await axios.get('http://localhost:3030/api/cards?limit=20');
      const cardIds = cardList.map((item) => item.id);
      if (cardIds.length > 0) {
        const dataSearch = response.data.cards.filter((o) => !cardIds.includes(o.id));
        setCardModalList(dataSearch);
        setMasterData(dataSearch);
      }
      else {
        setCardModalList(response.data.cards);
        setMasterData(response.data.cards);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onSearchCard = async (text) => {
    if (text) {
      try {
        const cardIds = cardList.map((item) => item.id);
        const dataSearch = masterData.filter((o) =>
          !cardIds.includes(o.id) &&
          (o.name.toLowerCase().includes(text.toLowerCase()) ||
            o.type.toLowerCase().includes(text.toLowerCase()))
        );

        setCardModalList(dataSearch);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    else {
      LoadData();
    }

  }
  const onAddCard = () => {
    const dataAdd = cardModalList.filter((data) => data.id === actionID);
    const dataChange = cardModalList.filter((data) => data.id !== actionID);
    cardList.push(dataAdd[0]);
    setCardList(cardList);
    setCardModalList(dataChange);
  }

  const onDeleteCard = () => {
    const dataChange = cardList.filter((data) => data.id === deleteID);
    const dataDelete = cardList.filter((data) => data.id !== deleteID);
    cardModalList.push(dataChange[0]);
    setCardModalList(cardModalList);
    setCardList(dataDelete);
  }

  useEffect(() => {
    if (actionID) {
      onAddCard();
    }
  }, [actionID])

  useEffect(() => {
    if (deleteID) {
      onDeleteCard();
    }
  }, [deleteID])

  useEffect(() => {
    LoadData();
  }, []);

  return (
    <>
      <header>
        <h1 style={{ textAlign: 'center' }}>My Pokedex</h1>
      </header>
      <div className='body-main'>
        <Container >
          <div className='scroll-bar-main'>

            <Row>
              {cardList.map((item, i) => {
                return (
                  <Col sm={6} key={item.id + i}>
                    <CardComponent item={item} type={true} actionID={setActionID} deleteID={setDeleteID} />
                  </Col>
                );
              })}
            </Row>
          </div>
        </Container>


        <CustomModal isOpen={isModalOpen} closeModal={closeModal}>
          <div className='input-container'>
            <input type='text' placeholder='Search...' className='input-box' onChange={(e) => onSearchCard(e.target.value)} />
            <img src={search} alt='Search Icon' className='search-icon' />
          </div>
          <Row>
            <div className='scroll-bar'>
              {cardModalList.map((item, i) => {
                return (
                  <Col sm={12} key={item.id + (i)}>
                    <CardComponent item={item} type={false} actionID={setActionID} deleteID={setDeleteID} />
                  </Col>
                );
              })}
            </div>
          </Row>
        </CustomModal>
      </div>

      <nav className='nav'>
        <label className='btn-add' onClick={openModal}>
          +
        </label>
      </nav>
    </>
  );
}

export default PokedexList;
