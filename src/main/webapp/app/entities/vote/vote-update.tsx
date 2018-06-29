import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IStory } from 'app/shared/model/story.model';
import { getEntities as getStories } from 'app/entities/story/story.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './vote.reducer';
import { IVote } from 'app/shared/model/vote.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IVoteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IVoteUpdateState {
  isNew: boolean;
  storyId: number;
  voteId: number;
}

export class VoteUpdate extends React.Component<IVoteUpdateProps, IVoteUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      storyId: 0,
      voteId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getStories();
    this.props.getUsers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { voteEntity } = this.props;
      const entity = {
        ...voteEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/vote');
  };

  storyUpdate = element => {
    const id = element.target.value.toString();
    if (id === '') {
      this.setState({
        storyId: -1
      });
    } else {
      for (const i in this.props.stories) {
        if (id === this.props.stories[i].id.toString()) {
          this.setState({
            storyId: this.props.stories[i].id
          });
        }
      }
    }
  };

  voteUpdate = element => {
    const id = element.target.value.toString();
    if (id === '') {
      this.setState({
        voteId: -1
      });
    } else {
      for (const i in this.props.users) {
        if (id === this.props.users[i].id.toString()) {
          this.setState({
            voteId: this.props.users[i].id
          });
        }
      }
    }
  };

  render() {
    const isInvalid = false;
    const { voteEntity, stories, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="planningpokerApp.vote.home.createOrEditLabel">
              <Translate contentKey="planningpokerApp.vote.home.createOrEditLabel">Create or edit a Vote</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : voteEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="vote-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="estimateLabel" for="estimate">
                    <Translate contentKey="planningpokerApp.vote.estimate">Estimate</Translate>
                  </Label>
                  <AvField id="vote-estimate" type="number" className="form-control" name="estimate" />
                </AvGroup>
                <AvGroup>
                  <Label for="story.id">
                    <Translate contentKey="planningpokerApp.vote.story">Story</Translate>
                  </Label>
                  <AvInput id="vote-story" type="select" className="form-control" name="story.id" onChange={this.storyUpdate}>
                    <option value="" key="0" />
                    {stories
                      ? stories.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput id="vote-story" type="hidden" name="story.id" value={this.state.storyId} />
                </AvGroup>
                <AvGroup>
                  <Label for="vote.id">
                    <Translate contentKey="planningpokerApp.vote.vote">Vote</Translate>
                  </Label>
                  <AvInput id="vote-vote" type="select" className="form-control" name="vote.id" onChange={this.voteUpdate}>
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput id="vote-vote" type="hidden" name="vote.id" value={this.state.voteId} />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/vote" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={isInvalid || updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  stories: storeState.story.entities,
  users: storeState.userManagement.users,
  voteEntity: storeState.vote.entity,
  loading: storeState.vote.loading,
  updating: storeState.vote.updating
});

const mapDispatchToProps = {
  getStories,
  getUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VoteUpdate);
