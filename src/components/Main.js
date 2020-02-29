import React, { Component } from 'react';
import Form from './Form.js';

class Main extends Component {
  render() {
    return(
      <main>
        <div className="wrapper">
          <div className="scroll-wrapper">
            <section className="card-container">
              <h2>Task List</h2>
              <div className="task-item-container">
                <div className="task-item">
                  <p>This is task #1 - Test</p>
                </div>
                <div className="task-item"></div>
                <div className="task-item"></div>
              </div>
            </section>

            <section className="card-container">
              <h2>In Progress</h2>
              <div className="task-item-container">
                <div className="task-item">
                  <p>This is task #1 - Test</p>
                </div>
                <div className="task-item"></div>
                <div className="task-item"></div>
              </div>
            </section>

            <section className="card-container">
              <h2>Done</h2>
              <div className="task-item-container">
                <div className="task-item">
                  <p>This is task #1 - Test</p>
                </div>
                <div className="task-item"></div>
                <div className="task-item"></div>
              </div>
            </section>
          </div>
        </div>

        <Form />
      </main>
    )
  }
}

export default Main;