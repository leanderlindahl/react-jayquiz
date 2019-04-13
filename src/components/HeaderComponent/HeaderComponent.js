import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { Layout, Col, Row } from 'antd';

const LogoDiv = styled('div')`
  width: 120px;
  height: 31px;
  line-height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
`;
const ScoreDiv = styled('div')`
  width: 120px;
  height: 31px;
  line-height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: right;
  color: white;
`;

export const HeaderComponent = props => {
  const { Header } = Layout;
  const { score } = props;
  return (
    <Header>
      <Row>
        <Col span={12}>
          <LogoDiv className="logo">JayQuiz</LogoDiv>
        </Col>
        <Col span={12}>
          <ScoreDiv>{`Score: ${score}`}</ScoreDiv>
        </Col>
      </Row>
    </Header>
  );
};

HeaderComponent.propTypes = {
  score: PropTypes.number
};

HeaderComponent.defaultProps = {
  score: 0
};

const mapStateToProps = state => ({
  score: state.score
});

export default connect(mapStateToProps)(HeaderComponent);
