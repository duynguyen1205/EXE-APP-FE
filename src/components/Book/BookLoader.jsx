import { Col, Row, Skeleton } from "antd";

const BookLoader = () => {
  return (
    <Row gutter={[20, 20]}>
      <Col md={10} sm={0} xs={0}>
        <Skeleton.Input
          active={true}
          block={true}
          style={{ width: "100%", height: 350 }}
        />
        <div
          style={{
            display: "flex",
            marginTop: 20,
            gap: 20,
            overflow: "hidden",
            justifyContent: "center",
          }}
        >
          <Skeleton.Image />
          <Skeleton.Image />
          <Skeleton.Image />
        </div>
      </Col>
      <Col md={14} sm={24}>
        <Skeleton active={true} paragraph={{rows: 3}}/>
        <br/> <br/>
        <Skeleton active={true} paragraph={{rows: 2}} />
        <br/> <br/>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            gap: 20,
            overflow: "hidden",
           
          }}
        >
        <Skeleton.Button active={true} style={{width: '100%'}} size="large"/>
        <Skeleton.Button active={true} style={{width: '100%'}} size="large"/>
        </div>
      </Col>
    </Row>
  );
};

export default BookLoader;
