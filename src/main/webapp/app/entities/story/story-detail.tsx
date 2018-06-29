import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './story.reducer';
import { IStory } from 'app/shared/model/story.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStoryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class StoryDetail extends React.Component<IStoryDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { storyEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="planningpokerApp.story.detail.title">Story</Translate> [<b>{storyEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="planningpokerApp.story.name">Name</Translate>
              </span>
            </dt>
            <dd>{storyEntity.name}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="planningpokerApp.story.description">Description</Translate>
              </span>
            </dt>
            <dd>{storyEntity.description}</dd>
            <dt>
              <span id="estimate">
                <Translate contentKey="planningpokerApp.story.estimate">Estimate</Translate>
              </span>
            </dt>
            <dd>{storyEntity.estimate}</dd>
          </dl>
          <Button tag={Link} to="/entity/story" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/story/${storyEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ story }: IRootState) => ({
  storyEntity: story.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StoryDetail);
