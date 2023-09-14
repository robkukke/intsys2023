def print_board(board_length, position):
    board = ['*' if space == position else '_' for space in range(board_length)]

    print(' '.join(board))


def get_player_move():
    while True:
        try:
            player_move = int(input('Move 1 or 2 spaces? '))

            if player_move in (1, 2):
                return player_move

            print('Invalid input. Please enter 1 or 2.')
        except ValueError:
            print('Invalid input. Please enter a number (1 or 2).')


def play_game():
    while True:
        board_length = int(input('How many spaces should the board have? '))
        position = 0

        print_board(board_length, position)

        while True:
            player_move = get_player_move()
            position += player_move

            print_board(board_length, position)

            print(f'The player moved {player_move} space(s).')

            if position >= board_length - 1:
                print('The player won!')
                break

            cpu_move = 2 if (board_length - position) % 3 == 0 else 1
            position += cpu_move

            print_board(board_length, position)

            print(f'The computer moved {cpu_move} space(s).')

            if position >= board_length - 1:
                print('The computer won!')
                break

        play_again = input('Do you want to play again? (y/n): ')

        if play_again.lower() != 'y':
            break


if __name__ == '__main__':
    play_game()
