#include "display.h"
#include <stdint.h>

SDL_Window *window = NULL;
SDL_Renderer *renderer = NULL;
uint32_t *color_buffer = NULL;
SDL_Texture *color_buffer_texture = NULL;
int window_width = 800;
int window_height = 600;

bool initialize_window(void) {
  if (SDL_Init(SDL_INIT_EVERYTHING) != 0) {
    fprintf(stderr, "Error initalizing SDL. \n");
    return false;
  };

  SDL_DisplayMode display_mode;
  SDL_GetCurrentDisplayMode(0, &display_mode);

  window_width = display_mode.w;
  window_height = display_mode.h;

  window =
      SDL_CreateWindow(NULL, SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED,
                       window_width, window_height, SDL_WINDOW_BORDERLESS);

  if (!window) {
    fprintf(stderr, "Error creating SDL window. \n");
    return false;
  }

  // Create a SDL renderer
  renderer = SDL_CreateRenderer(window, -1, 0);

  if (!renderer) {
    fprintf(stderr, "Error creating SDL renderer \n");
    return false;
  }

  SDL_SetWindowFullscreen(window, SDL_WINDOW_FULLSCREEN);

  return true;
}

void clear_color_buffer(uint32_t color) {
  for (int y = 0; y < window_height; y++) {
    for (int x = 0; x < window_width; x++) {

      color_buffer[(window_width * y) + x] = color;
    }
  }
}

void render_color_buffer() {
  SDL_UpdateTexture(color_buffer_texture, NULL, color_buffer,
                    ((int)window_width * sizeof(uint32_t)));

  SDL_RenderCopy(renderer, color_buffer_texture, NULL, NULL);
}

void draw_grid(void) {
  int grid_size = 10;

  for (int y = 0; y < window_height; y += grid_size) {

    for (int x = 0; x < window_width; x += grid_size) {

      // Draw black
      color_buffer[(window_width * y) + x] = 0xFFFFFFFF;
    }
  }
}

void draw_pixel(int x, int y, uint32_t color) {
  if (x < window_width && y < window_height) {
    color_buffer[(y * window_width) + x] = color;
  }
}

void draw_rect(int x, int y, int width, int height, uint32_t color) {
  for (int currentY = y; currentY < y + height; currentY++) {

    for (int currentX = x; currentX < x + width; currentX++) {
      color_buffer[(window_width * currentY) + currentX] = color;
    }
  }
}

void destory_window(void) {
  free(color_buffer);
  SDL_DestroyRenderer(renderer);
  SDL_DestroyWindow(window);
  SDL_Quit();
}
