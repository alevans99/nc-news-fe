import { useState, useContext } from 'react';
import { postNewArticle, postNewTopic } from '../utils/api';
import { capitaliseString } from '../utils/utils';
import CollapsableContainer from './CollapsableContainer';
import './styles/NewArticle.css';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import ValidationWarning from './ValidationWarning';

function NewArticle({ allTopics, setAllTopics, currentTopic }) {
  const [articleTitle, setArticleTitle] = useState('');
  const [articleBody, setArticleBody] = useState('');
  const [topic, setTopic] = useState(
    currentTopic !== 'all' ? capitaliseString(currentTopic) : 'Coding'
  );
  const [newArticleValidationVisible, SetNewArticleValidationVisible] =
    useState(false);
  const [newArticleValidationText, setNewArticleValidationText] = useState('');

  const [newTopicVisible, setNewTopicVisible] = useState(false);
  const [newTopic, setNewTopic] = useState('');
  const [newTopicDescription, setNewTopicDescription] = useState('');
  const [newTopicValidationVisible, SetNewTopicValidationVisible] =
    useState(false);
  const [newTopicValidationText, setNewTopicValidationText] = useState('');

  const { currentUser } = useContext(UserContext);
  let navigate = useNavigate();

  const addNewArticle = () => {

    if (articleTitle.length < 4 || articleTitle.length > 25) {
      setNewArticleValidationText(
        'Article titles must be between 3-25 characters long'
      );
      SetNewArticleValidationVisible(true);
      return;
    }

    if (articleBody.length < 1) {
      setNewArticleValidationText('New articles must not be blank');
      SetNewArticleValidationVisible(true);
      return;
    }
    SetNewArticleValidationVisible(false);

    postNewArticle(
      currentUser.username,
      articleTitle,
      articleBody,
      topic.toLowerCase()
    )
      .then((result) => {
        navigate(`/topics/${topic.toLowerCase()}/articles`);
      })
      .catch((err) => {
        setNewArticleValidationText(
          'Unfortunately there was an error adding the new topic'
        );
        SetNewArticleValidationVisible(true);
      });
  };

  const addNewTopic = () => {
    if (!/^([a-z0-9-_ ])+$/.test(newTopic)) {
      setNewTopicValidationText(
        'New topics must be lower-case and only contain letters, numbers, hyphens and underscores'
      );
      SetNewTopicValidationVisible(true);
      return;
    }

    if (newTopic.length < 4 || newTopic.length > 25) {
      setNewTopicValidationText(
        'New topics must be between 3-25 characters long'
      );
      SetNewTopicValidationVisible(true);
      return;
    }

    if (newTopicDescription.length < 1) {
      setNewTopicValidationText(
        'Please provide a description for the new topic'
      );
      SetNewTopicValidationVisible(true);
      return;
    }

    SetNewTopicValidationVisible(false);

    postNewTopic(newTopic.toLowerCase(), newTopicDescription)
      .then((result) => {
        setTopic(newTopic);
        setNewTopic('');
        setNewTopicDescription('');
        setNewTopicVisible(false);

        setAllTopics((previousTopics) => {
          return [...previousTopics, result];
        });
      })
      .catch((err) => {
        setNewTopicValidationText(
          'Unfortunately there was an error adding the new topic'
        );
        SetNewTopicValidationVisible(true);
      });
  };

  return (
    <div className={`NewArticle`}>
      <div className='new-article-container'>
        <h2 className='new-article-page-title'>Submit a New Article</h2>
        <form
          className='new-article-form'
          onSubmit={(e) => {
            e.preventDefault();
            addNewArticle();
          }}
        >
          <fieldset className='new-article-fieldset'>
            <legend className='new-article-legend'>
              Complete all required fields before submitting your article
            </legend>
            <label
              htmlFor='new-article-title-input'
              className='new-article-article-title-label'
            >
              Article Title
            </label>
            <input
              name='new-article-title-input'
              className='new-article-title-input'
              value={articleTitle}
              onChange={(e) => {
                setArticleTitle(e.target.value);
              }}
            ></input>
            <div className='new-article-topic-container'>
              <div className='new-article-topic-title-container'>
                <label
                  htmlFor='new-article-topic-select'
                  className='new-article-topic-select-label'
                >
                  Topic
                </label>
                <button
                  className='new-article-new-topic-button'
                  onClick={(e) => {
                    e.preventDefault();
                    setNewTopicVisible((previousState) => {
                      return !previousState;
                    });
                  }}
                >
                  Add New
                </button>
              </div>
              <CollapsableContainer isVisible={newTopicVisible}>
                <div className='new-topic-container'>
                  <div
                    className='new-topic-entry'
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <h3 className='new-topic-title'>Add a New Topic</h3>
                    <label
                      htmlFor='new-topic-input'
                      className='new-topic-input-label'
                    >
                      Topic Title
                    </label>
                    <input
                      className='new-topic-input'
                      name='new-topic-input'
                      value={newTopic}
                      onChange={(e) => {
                        setNewTopic(e.target.value);
                      }}
                    ></input>
                    <label
                      htmlFor='new-topic-description-input'
                      className='new-topic-description-input-label'
                    >
                      Topic Description
                    </label>
                    <input
                      className='new-topic-description-input'
                      name='new-topic-description-input'
                      value={newTopicDescription}
                      onChange={(e) => {
                        setNewTopicDescription(e.target.value);
                      }}
                    ></input>
                    <button
                      className='new-topic-submit-button'
                      onClick={(e) => {
                        e.preventDefault();
                        addNewTopic();
                      }}
                    >
                      Submit
                    </button>
                    <ValidationWarning
                      isVisible={newTopicValidationVisible}
                      warningText={newTopicValidationText}
                    ></ValidationWarning>
                  </div>
                </div>
              </CollapsableContainer>
              <select
                className='new-article-topic-select'
                value={topic}
                onChange={(e) => {
                  setTopic(e.target.value);
                }}
              >
                {allTopics.map((topic) => {
                  return (
                    <option
                      className='new-article-topic-option'
                      key={topic.slug}
                    >
                      {capitaliseString(topic.slug)}
                    </option>
                  );
                })}
              </select>
            </div>
            <label
              htmlFor='new-article-article-body'
              className='new-article-article-body-label'
            >
              Article Text
            </label>
            <textarea
              className='new-article-article-body'
              name='new-article-article-body'
              value={articleBody}
              onChange={(e) => {
                setArticleBody(e.target.value);
              }}
            ></textarea>
            <ValidationWarning
              isVisible={newArticleValidationVisible}
              warningText={newArticleValidationText}
            ></ValidationWarning>
            <button className='new-article-submit-button'>Submit</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default NewArticle;
