import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './vote.reducer';
import { IVote } from 'app/shared/model/vote.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVoteProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Vote extends React.Component<IVoteProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { voteList, match } = this.props;
    return (
      <div>
        <h2 id="vote-heading">
          <Translate contentKey="planningpokerApp.vote.home.title">Votes</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="planningpokerApp.vote.home.createLabel">Create new Vote</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="planningpokerApp.vote.estimate">Estimate</Translate>
                </th>
                <th>
                  <Translate contentKey="planningpokerApp.vote.story">Story</Translate>
                </th>
                <th>
                  <Translate contentKey="planningpokerApp.vote.vote">Vote</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {voteList.map((vote, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${vote.id}`} color="link" size="sm">
                      {vote.id}
                    </Button>
                  </td>
                  <td>{vote.estimate}</td>
                  <td>{vote.story ? <Link to={`story/${vote.story.id}`}>{vote.story.id}</Link> : ''}</td>
                  <td>{vote.vote ? vote.vote.id : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${vote.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${vote.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${vote.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ vote }: IRootState) => ({
  voteList: vote.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Vote);
