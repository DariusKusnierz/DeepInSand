# DeepInSand

Projekt ten został opracowany podczas wydarzenia typu "Game Jam". Stworzona w ten sposób gra miała nawiązywać tematyką do piasku.

Ta prosta gra jest dedykowana na przeglądarkę "Mozilla Firefox", a czasu na jej wykonanie miałem jedynie 48h.


## Użyte funkcje:
- startGame
- earnPoints
- generateBlock
- randomNumbers
- fallBlock
- generateAvatar
- keyDownHandler
- heyUpHandler
- moveAvatar
- collision
- fallAvatar
- theEnd
- generateCoin
- grabCoin

## startGame
Rozpoczyna grę, przygotowując niezbętne elementy. 
Na początku generuje 8 bloków będących podstawą planszy. Ustawia interwały w jakich mają pojawiać się nowe bloki oraz monety. Dodatkowo generuje awatara gracza i ustala co jaki czas aktualizowana ma być pozycja gracza oraz jego punktacja. Wszystkie interwały dodawane są do tablicy. Na koniec ukrywany jest ekran powitalny gry.

![image](https://user-images.githubusercontent.com/72936095/123782409-9be45c00-d8d5-11eb-98e0-e514e12470cc.png)

## earnPoints
Zwiększa ilość punktów oraz wyświetla ich ilość na ekranie.

![image](https://user-images.githubusercontent.com/72936095/123785424-cdaaf200-d8d8-11eb-8ab7-f43d80307af2.png)

## generateBlock
Generuje nowe bloki na planszy. Posiada 3 parametry:
- l - parametr left nowego bloku
- t - parametr top nowego bloku
- type - typ bloku (1 - podstawa planszy, 0 - spadający blok)

Funkcja tworzy nowy element typu div, nadaje mu podstawowe paramety takie jak pozycja oraz klasa, a następnie przypisuje go do planszy gry (board) jako elemnet potomny.
Jeśli wartość parametru "type" nie wynosi 1 to dodawany jest interwał dla generowanego bloku, opuszczający go. W przeciwnym przypadku oznacza to, że generowany blok jest podstawą planszy i nadawany jest mu odpowiedni identyfikator, a tablica "road" zmienia wartość na true dla elementu odpowiadającemu blokom podstawy planszy. Oznacza to, iż dany blok jest na swoim miejscu.

![image](https://user-images.githubusercontent.com/72936095/123785824-40b46880-d8d9-11eb-9e14-69806de97644.png)

## randomNumbers
Wylosowuje i zwraca liczbę całkowitą od 0 do 8.

![image](https://user-images.githubusercontent.com/72936095/123788189-039da580-d8dc-11eb-91af-12951d3ad304.png)

## fallBlock
Ustanawia nową pozycję wybranego bloku oraz sprawdza czy wystąpiła jego kolizja.
Gdy blok osiągnie graniczną wartość 450px dla parametru "top", blok ten jest usuwany. 
W momencie osiągnięcia wartośći 300px dla parametru "top" (na wartości tej znajdują się wszystkie bloki podstawy planszy), losowana jest cyfra. Jeśli będzie nią "5" (szansa na to wynosi 1/8) to dla bloku podstawy, który jest mijany, ustawiany jest interwał spadania. W każdym innym przypadku sprawdzana jest kolizaja danego bloku.

![image](https://user-images.githubusercontent.com/72936095/123788417-45c6e700-d8dc-11eb-9c8f-33b69977c9c1.png)

## generateAvatar
Funkcja tworzy nowy element typu div, nadaje mu podstawowe paramety takie jak pozycja oraz identyfikator, a następnie przypisuje go do planszy gry (board) jako elemnet potomny. Jest to avatar gracza na planszy.

![image](https://user-images.githubusercontent.com/72936095/123790309-74de5800-d8de-11eb-968b-9507805a96ba.png)

## keyDownHandler
Przechwytuje wciśnięcie przycisku na klawiaturze, przez gracza.

![image](https://user-images.githubusercontent.com/72936095/123790918-267d8900-d8df-11eb-8daf-506a256046c0.png)

## keyUpHandler
Przechwytuje puszczenie przycisku na klawiaturze, przez gracza.

![image](https://user-images.githubusercontent.com/72936095/123791126-5af14500-d8df-11eb-8f9e-5e17ed4edf7d.png)

## moveAvatar
Zmienia pozycję avatara gracza.
Przy zmianie kierunku (lewo/prawo), zmieniany jest obraz awataru w taki sposób aby był on ustawiony w kierunku poruszania się gracza.
Jeśli wciśnięty jest przycisk skoku to awatar porusza się w górę, do momentu zwoleniania przycisku lub osiągnięcia wartości krytycznej. W takim przypadku możliwość skoku jest blokowana ustawiając zmienną "jumpFall" na true, a avatar opada, do momentu uzyskania pozycji podstawy planszy.

![image](https://user-images.githubusercontent.com/72936095/123791175-69d7f780-d8df-11eb-8990-61a48d5c08f2.png)

## collision
Sprawdza czy pozycje bloku i avatara nie nachodzą się na siebie (czy doszło do kolizji). W przypadku wystąpienia kolizji gra jest kończona.

![image](https://user-images.githubusercontent.com/72936095/123792570-0ea70480-d8e1-11eb-85db-4a3fd496a164.png)

## fallAvatar
Sprawdza czy wystąpiła sytuacja wypadnięcia poza planszę avataru (wartość parametru "top" osiągnęła lub przekroczyła 450px) lub wejście w przestrzeń bloku podstawy planszy, którego już nie ma na swoim miejscu. W takich sytuacjach gra się kończy.

![image](https://user-images.githubusercontent.com/72936095/123792937-7bba9a00-d8e1-11eb-9bd8-406d10744aad.png)

## theEnd
Kończy grę. 
Wyświetla odpowiedni obraz wraz z całkowitą ilością punktów oraz czyści wszystkie ustawione interwały czasowe.

![image](https://user-images.githubusercontent.com/72936095/123794148-d3a5d080-d8e2-11eb-9c9d-f9f34b3575cf.png)

## generateCoin
Funkcja tworzy nowy element typu div, nadaje mu podstawowe paramety takie jak pozycja oraz identyfikator, a następnie przypisuje go do planszy gry (board) jako elemnet potomny. Jest to moneta na planszy (w tym przypadku w postaci dzbanku wody).
Dla wygenerowanej monety ustawiany jest interwał sprawdzający czy wystąpiła kolizja z monetą oraz ustawia czas po którym moneta zostanie usunięta.

![image](https://user-images.githubusercontent.com/72936095/123794544-3dbe7580-d8e3-11eb-8fed-56f34bedefe6.png)

## grabCoin
Sprawdza czy pozycje monety i avatara nie nachodzą się na siebie (czy doszło do kolizji). W przypadku wystąpienia kolizji moneta jest usuwana, do puli punktów dopisywane są 2 punkty i aktualizowana jest punktacja na ekranie.

![image](https://user-images.githubusercontent.com/72936095/123795751-9e9a7d80-d8e4-11eb-9ce2-c4be388d688a.png)
