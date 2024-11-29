# WidoitWebApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## Folder Structure

### `src/app/`

- **Core/**
  This folder contains core components and services that are used across the entire application.
  
  - **Layout/**
    Contains components for the general layout of the application such as the header, footer, and main content area.
    
    - `footer.component.ts`: Footer component.
    - `header.component.ts`: Header component.
    - `main.component.ts`: Main content component.
    - `dynamic-menu-buttons`: Buttons for editing rows in tables.

- **Models/**
  This folder is used to store TypeScript classes and interfaces that define the types used in the application, ensuring strong typing across the codebase.

  - `user.model.ts`: Example of a model defining the structure of a user object.

- **Interceptors/**
  This folder contains HTTP interceptors that modify outgoing HTTP requests or handle incoming HTTP responses globally for the entire app.

  - `auth.interceptor.ts`: Example of an interceptor for adding authentication tokens to HTTP requests.

- **Modules/**
  This folder holds different feature modules of the application. Each module is self-contained and may have its own components, services, and routing.

  - **Dashboard/**
    The `Dashboard` module contains components specific to the dashboard view.
    
    - **DashboardHeaderComponent**: Header for the dashboard.
    - **DashboardFiltersComponent**: Filters section for the dashboard.
    - **DashboardBuscadorComponent**: Search bar for the dashboard.

- **Pipes/**
  This folder contains custom pipes that transform data before it is displayed in the UI.

  - `date-format.pipe.ts`: Example of a custom pipe for formatting dates.

- **Services/**
  This folder stores services, which are responsible for handling business logic, API calls, and shared state management across the application.

  - `user.service.ts`: Example of a service for handling user-related operations.

- **Shared/**
  The `Shared` folder contains reusable components, directives, and modules that can be shared across multiple modules of the application.

  - `button.component.ts`: A reusable button component.
  - `card.component.ts`: A reusable card component.

### `src/assets/`

This folder contains static assets like images, styles, and other media files used in the application. These files are copied as-is when the application is built.

### `src/environments/`

This folder contains environment-specific configuration files.

- `environment.ts`: The default environment configuration (usually for development).
- `environment.prod.ts`: The production environment configuration.
