Loggbok – World Clock-projektet
Vecka 1

Måndag–Onsdag

Startade projektet med målet att bygga en webbaserad världsklocka i React/TypeScript.

Planerade funktioner: visa flera städer med lokala tider och bakgrundsbilder, samt spara val i localStorage.

Satte upp grundstrukturen med react-router, komponenter för klocka och stadsvy.

Torsdag–Fredag

Implementerade de första versionerna av Clock och CityPage.

Förberedde en lista med städer och tidszoner.

Testade import av bilder för utvalda städer (London, New York, Paris, Tokyo).

Vecka 2

Måndag

Upptäckte ett större problem: projektet började krascha på grund av felaktiga beroenden och filstrukturer.

Försökte först laga koden men insåg att det skulle ta längre tid än att börja om.

Tisdag–Lördag (5 intensiva dagar)

Beslutade att göra om hela projektet från början.

Satt långa pass varje dag (fem dagar i rad) för att återskapa alla komponenter:

CityForm för att lägga till städer dynamiskt.

Lagring i localStorage för användarens val.

Filtrering och sökning i dropdown-menyn.

Hantering av tidszoner i CityPage.

söndag 

vart äntligen klar med projketet. har inte stött på något problem än så länge.. 

jag lade till fler städer och tillhörande IANA-tidzoner i CityPage.

jag förbättrade min CityForm så att alla städer alltid visas i dropdownen och användaren kan söka eller skicka in egna 
städer med gmt-offset.



REFLEKTION
Det oväntade haveriet mitt i arbetet innebar att mycket tid gick åt till att rädda projektet snarare än att finslipa koden. Resultatet fungerar väl men koden är kanske inte så “perfekt” strukturerad som jag först tänkt.
Samtidigt gav det en bra inlärning i felsökning, TypeScript-typer och hur man hanterar lokala resurser i React.

