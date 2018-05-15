import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import * as color from '../../UI/color';

const Item = styled.div`
  width: 650px;
  display: flex;
  margin: 30px 10px;
  border-radius: 5px;
  box-shadow: 0 0 1px black;
  background: white;
  overflow: hidden;
`;

const Image = styled.img`
  max-width: 150px;
  max-height: 120px;
`;

const Info = styled.div`
  margin-top: 10px;
  margin-left: 20px;
`;

const Heading = styled.div`
  color: ${color.colorG};
  font-size: 22px;
  margin-bottom: 5px;
  text-transform: capitalize;
`;

const LocationTime = styled.div`
  font-size: 16px;
`;

const Price = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const ProductListItem = props => {
  const { title, location, price, date } = props.item;
  return (
    <Item>
      <Image src="https://picsum.photos/400/400?random" />
      <Info>
        <Heading>{title}</Heading>
        <LocationTime>
          {location} ‒ {moment(moment(date).format()).fromNow()}
        </LocationTime>
        <Price>৳ {price}</Price>
      </Info>
    </Item>
  );
};

ProductListItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default ProductListItem;
