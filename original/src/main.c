#include <stdio.h>
#include <stdbool.h>
#include <SDL2/SDL.h>

SDL_Window* window;
SDL_Renderer* renderer;
bool is_running = false;

void initialize_window(void) {
  if (SDL_Init(SDL_INIT_EVERYTHING) != 0) {
    fprintf(stderr, "Error initalizing SDL. \n");
    return false;
  }; 

  window = SDL_CreateWindow(
    NULL,
    SDL_WINDOWPOS_CENTERED,
    SDL_WINDOWPOS_CENTERED,
    800,
    600,
    SDL_WINDOW_BORDERLESS
  );

  if (!window) {
    fprintf(stderr, "Error creating SDL window. \n");
    return false;
  }

  // Create a SDL renderer
  renderer = SDL_CreateRenderer(window, -1, 0)

  if (!renderer) {
    fprintf(stderr, "Error creating SDL renderer \n");
    return false; 
  }

  return true;
}

void setup(void) {
  // TODO:
}


void process_input(void) {
  // TODO:
}

void update(void) {
  // TODO:
}

void render(void) {
  // TODO:
}

int main(void) {
  is_running = initialize_window();

  setup();

  while (true) {
    process_input();
    update();
    render();
  }

  return 0;
}
