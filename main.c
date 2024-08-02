#include <stdbool.h>
#include <stdio.h>

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

int main() {

  int N;
  long int s;
  scanf("%d", &N);
  s = 1;
  int sum = 0;
  for (int i = 1; i <= N; i++) {
    s = s * i;
    sum = sum + i;
  }

  // Write an answer using printf(). DON'T FORGET THE TRAILING \n
  // To debug: fprintf(stderr, "Debug messages...\n");
  printf("%ld\n%d", s, sum);
  return 0;
}