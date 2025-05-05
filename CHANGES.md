# Subtasks

## Changes

I have kept the changes to a minimum, not refactoring the code or changing the behaviour.

- Subtasks can be added to tasks and they will be listed under the task.
- Loading of the complete subtasks is done with the new endpoint.

This is not very efficient but it solves the problem.

The prevention creation of subtasks to subtasks is only in the frontend.

The decision was made to not pull in new dependencies for validation and transformation of the dto. These transformers can be syntacially nice, but also come with unexpected behaviour.

Since we are building a new endpoint for subtasks, I used it for the fetching. As said, not very efficient since it requires a lot of requests from the client.

Other approaches would be to populate it in the all tasks endpoint, which then also would filter the top level tasks as a start and build a tree. Another way would be to only fetch the subtasks that are expanded.
Also the whole set of tasks are refetched when a subtask is added where we instead could just add the new subtask to the state, this could be solved with a map of the tasks in the context.

## Existing Code

The whole repo lacks a lot of base features, like error handling, loading indicators, testing, etc.
The development setup seems to not be fully done, since it doesn't have auto reloading, and there seem to be a clash between the host machine node_modules and the ones in the docker images. I did not commit any local changes I had to do to develop with quick feedback.

The existing code was not nice to work with, it is not formatted properly, there are unused dependencies, imports and variables so the linter gets upset.

## Improvements

Current get all endpoint is fetching all tasks, and is filtered in the frontend. But it doesn't fetch complete subtasks so doesn't seem to fully comply with the existing implemetation in the viewer.

Either the complete tasks tree should be fetched, with maybe a limit on depth. Or it can be loaded on demand, for example when a task is expanded.

We could assume that tasks would have an owner for a multitenant system.
The database is in memory with no indications on keys for quick lookup if it would have been a real database. So adding persistant storage with migrations for the fields. A postgres database would be a good choice so be able to do queries across the tasks.


### Code base
- Proper development setup with hot reloading.
- Reformat all code along a style guide.
- Remove unused dependencies.
- Add tests, both unit tests and integration tests.

### UI
- Add loading indicators and error handling with visual feedback to the user.
- Styling, could use a framework with existing components

### Performance / System
- Caching of tasks to prevent table searches
- Pagination of tasks / not fetching all tasks / subtasks
- Allow full tree structure of subtasks having subtasks
- CRUD, should be able to update and delete
- Task ownership
- Changelog for tasks, could treat task creation as events
- Real database

### Deployment
- CI/CD pipeline
- Logging and monitoring
