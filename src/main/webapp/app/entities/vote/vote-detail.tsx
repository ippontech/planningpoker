import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vote.reducer';
import { IVote } from 'app/shared/model/vote.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVoteDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class VoteDetail extends React.Component<IVoteDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { voteEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="planningpokerApp.vote.detail.title">Vote</Translate> [<b>{voteEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="estimate">
                <Translate contentKey="planningpokerApp.vote.estimate">Estimate</Translate>
              </span>
            </dt>
            <dd>{voteEntity.estimate}</dd>
            <dt>
              <Translate contentKey="planningpokerApp.vote.story">Story</Translate>
            </dt>
            <dd>{voteEntity.story ? voteEntity.story.id : ''}</dd>
            <dt>
              <Translate contentKey="planningpokerApp.vote.vote">Vote</Translate>
            </dt>
            <dd>{voteEntity.vote ? voteEntity.vote.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/vote" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/vote/${voteEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ vote }: IRootState) => ({
  voteEntity: vote.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VoteDetail);
