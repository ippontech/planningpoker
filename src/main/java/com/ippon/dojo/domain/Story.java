package com.ippon.dojo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Story.
 */
@Entity
@Table(name = "story")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Story implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "estimate")
    private Long estimate;

    @OneToMany(mappedBy = "story")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Vote> stories = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Story name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Story description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getEstimate() {
        return estimate;
    }

    public Story estimate(Long estimate) {
        this.estimate = estimate;
        return this;
    }

    public void setEstimate(Long estimate) {
        this.estimate = estimate;
    }

    public Set<Vote> getStories() {
        return stories;
    }

    public Story stories(Set<Vote> votes) {
        this.stories = votes;
        return this;
    }

    public Story addStory(Vote vote) {
        this.stories.add(vote);
        vote.setStory(this);
        return this;
    }

    public Story removeStory(Vote vote) {
        this.stories.remove(vote);
        vote.setStory(null);
        return this;
    }

    public void setStories(Set<Vote> votes) {
        this.stories = votes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Story story = (Story) o;
        if (story.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), story.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Story{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", estimate=" + getEstimate() +
            "}";
    }
}
