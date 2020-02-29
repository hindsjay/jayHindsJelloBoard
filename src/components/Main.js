import React, { Component } from 'react';

class Main extends Component {
  render() {
    return(
      <main>
        <section class="tasks-container">
          <h2>Task List</h2>
          <div className="task-item-container">
            <div class="task-item">
              <p>This is task #1 - Test</p>
            </div>
            <div class="task-item"></div>
            <div class="task-item"></div>
          </div>
        </section>
      </main>
    )
  }
}

export default Main;