## U09 - Banterly

### Vad är detta?

Här skriver jag loggbok över min arbetsprocess med uppgiften U09, som jag beslutat göra i form av en Twitter-klon. Processen är redan påbörjad i form av setup av projektet, men jag kommer att dokumentera vad jag gör från UX till färdig produkt från och med nu.

#### 2026-09-12

Har bestämt mig för att skapa en nerskalad version av Twitter, med namnet Banterly. Jag övervägde först namnet Yapper, men insåg att det har en negativ konnotation i allmänhet och produkten skulle då bli svår att ta på allvar om man exempelvis vill diskutera politik eller andra seriösare ämnen. Jag övervägde även namn som Fluid, Articulate, Eloquent och Speak, men när jag bad ChatGPT ta reda på om det redan existerade produkter med dessa namn, fann jag att de alla var upptagna. Därför landade beslutet i _Banterly_, som förvisso antyder en vardagligare ton i form av underhållande småprat, men dock klingar mer positivt. Jag vill inte heller att produkten ska verka alltför allvarlig i sin framtoning, utan inbjuda till lättsamt prat om högt och lågt. Jag bedömde detta namn ungefär likvärdigt med Twitter eller Threads i det avseendet.

Jag har även skapat en undersökande enkät med hjälp av kunskapen från UX-kursen under första året samt några fler källor. Jag tänkte på vad jag vill få reda på med hänsyn till att jag ska skapa en produkt som liknar en existerande tjänst och frågade därför mycket om användarnas upplevelse av Twitter, X och Threads. Jag följde principen att blanda stängda och öppna frågor, men ställde många öppna frågor för att se om det går att skönja ett mönster i vad användarna uppskattar med de existerande tjänsterna, såväl som vad de inte uppskattar. Även frågor om deras användarvanor av liknande produkter samt deras ålder ställdes, då det är något att ta hänsyn till i designen. Jag valde också bort saker som jag inte finner relevanta för mig just nu, såsom exempelvis kön.

Enligt användbarhetsmålen i Preece, Rogers & Sharp ska en användbar produkt vara bland annat inpräntande (lätt att komma ihåg hur man använder) och intuitiv (lätt att lära). Eftersom jag har en existerande produkt att utgå från, kan jag dra nytta av det redan inlärda användandet hos målgruppen med Twitter, förutsatt att de använder eller har använt det, och även det intuitiva som då följer med tidigare användning av något liknande. Därför tänker jag inte att jag behöver "uppfinna hjulet" igen, utan kan ha Twitter/X och Threads som förlagor designmässigt. Dock behöver jag via min enkät först få svar på om majoriteten har använt Twitter/X och om de tycker att det är intuitivt att använda.

Enkäten har skickats ut i klassen och bland vänner och bekanta, inväntar svar för att gå vidare med prototyper.

**_Källor_**

- https://camelonta.se/tips-och-trender/sa-goer-du-en-snabb-anvaendbarhetsutvaerdering
- Preece, J., Rogers, Y., & Sharp, H. (2016). Interaktionsdesign - bortom människa-dator-interaktion. Lund: Studentlitteratur

### 2024-09-18

Jag har nu fått in svar från fem respondenter på min enkät, och väntat in evetuella fler svar, så nu kan jag använda den data jag fått in för att skapa Lo-Fi-prototyper och personas.

### 2024-09-19

Fräschar upp minnet lite om UX och mobile first, eftersom samtliga respondenter valt att använda mobilen i första hand vid användning av en tjänst som Banterly. Eftersom svaren i min enkät också antydde att om någon av tjänsterna Twitter så som det såg ut innan, X och Threads, så är designen av Threads den som föredras av respondenterna, och jag kommer därför att använda den i första hand som förlaga för designen. Något jag la märke till bland de svar jag fick in var också att Twitter (X) upplevdes som plottrig. Designen i Threads upplever jag däremot som minimalistisk och jag drar slutsatsen att det kan vara dess mer clean design som gör att fler föredrar den. Det blir också något jag kommer att ta med mig i designarbetet.

Arbetar med Lo-Fi-prototyper i Figma.

### 2024-09-24

Skapat persona utifrån min användarenkät och fortsatt med prototyper.

### 2024-10-03

Har glömt bort att skriva logg över det jag gör, vilket brukar hända när jag kommit en bit in i projekt och blir för fokuserad på att lösa problem som uppstår. Tiden som gått i projektet hittills har jag lagt på att bygga upp min backend. Har delat upp enligt MVC(R) med controllers, routes och models. Fastnade på bland annat att validera email vid signup, för att jag testade ett exempel på regex som inte fungerade. Märker att det blir allt lättare att felsöka ju mer jag lär mig, för jag kan snabbare räkna ut var felet borde vara och därför vad jag ska söka på för att lösa det! Nu är signup med jsonwebtoken och cookie parser klar och testad med Insomnia, härnäst ska jag skapa funktionalitet för login. Allt kommer in som det ska i datavasen. Jag har inte kommit igång med designen ännu för att jag inte bestämt mig för om jag ska använda Tailwind eller CSS. Jag behöver öva på CSS men det tar också längre tid.

### 2024-10-09

Jag jobbar vidare med backend. Användare ska kunna följa och gilla varandras inlägg och ens följares inlägg ska dyka upp i feeden. Däremot tänker jag begränsa till bara text-inlägg till att börja med, då flera i min UX-undersökning uttryckte att de föredrog det gamla Twitter alternativt andra forum som Reddit. Jag fokuserar nu på att skapa user controllers, och har skapat en branch för det med git, eftersom vi ska följa Git flow. Jag har också skapat en projekttavla på Github i anslutning till mitt repo, samt några övergripande user stories.

**_Källor_**

- https://www.uxpin.com/studio/blog/a-hands-on-guide-to-mobile-first-design/

### 2024-10-20

Jag har gjort färdigt backend, och har jobbat med frontend under den gångna veckan. Min obeslutsamet kring val av CSS vs Tailwind gjorde att jag fick väldigt lite tid kvar till frontend och jag önskar nu att jag hade börjat med det tidigare. Det här är ett mönster jag har som jag måste försöka hitta en lösning på. För mig är det svårt att överblicka ett helt projekt och å ena sidan inta rollen som produktägare och å andra sidan vara utvecklare och jobba en "ticket" i taget. Jag svävar lätt iväg och gör något annat än det jag tänkte och jobbar med flera delar samtidigt, vilket gör det svårare att både överblicka helheten samt att veta vad exakt jag gjort i varje commit. Detta behöver jag öva mer på.

Jag lägger också märke till att mitt fokus, som i vanliga fall är oberäkneligt, nu är oerhört svårt att frammana och att jag inte överhuvudtaget kan styra när jag ska koncentrera mig och på vad. Detta har varit ett stort problem för mig i det här projektet hittills, och anledningen till att saker tar så lång tid. Dock har jag också en förmåga att jobba extra intensivt när jag vet att det snart är deadline, så nu hoppas jag att en "extra växel" infinner sig så jag kan bli klar i tid.

Jag har delat upp arbetet i issues på projekttavlan på Github, men insåg att jag hade glömt search. Jag har också glömt att skapa admin, men har kommentarerna å andra sidan där det går att skapa en kommentar på en post, som i sin tur är kopplat till en user, och jag har lagt till delete också. Ska fråga om det är okej på handledning, annars får jag försöka hinna lägga till det. Jag har haft väldigt svårt att omvandla kraven i uppgiftsbeskrivningen för u09 till issues. Mina anteckningar är utspridda på olika ställen.

Härnäst ska jag bygga Search-komponent och göra klart designen. Efter det ska all övrig frontend-funktionalitet på plats.
