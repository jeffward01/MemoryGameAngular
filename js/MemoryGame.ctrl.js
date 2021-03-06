angular.module('app').controller('MemoryGameController', function ($scope, $timeout) {

    //My deck of cards
    $scope.cards = [];

    //Holding Array for deck of cards
    $scope.selectedCards = [];



    //Scoreboard
    $scope.PlayerTurn = "Player 1";
    clearCounts();

    $('#gameArea').hide();


    //Build Deck of Cards 
    //• id = the id of the particular card
    //• flipped = 'false' if the back of the card is showing -- 'true' if the card is 'flipped'
    //and face is showing
    //• value = calculates value to create an even amount of matchinf pairs
    //• disabled = if pair is found, disabled = 'true'

    $scope.build = function (x) {
      clearCounts();
        $('#gameArea').show();

        $scope.cards = [];

        for (var i = 0; i < x; i++) {
            $scope.cards.push({
                id: i + 1,
                flipped: false,
                value: getValue(i),
                disabled: false
            })
        }
        //Shuffle deck once built
        shuffle($scope.cards);

    }
    $scope.clear = function () {
       clearCounts();
        $('#gameArea').hide();
        $scope.cards = [];

    }



    //Shuffle deck once built
    shuffle($scope.cards);

    //Generates the Value of each card in a deck
    function getValue(x) {
        if (x % 2 == 0) {
            return x;
        }
        return x - 1;
    }

    //Shuffle Function
    function shuffle(deck) {
        for (var j, x, i = deck.length; i; j = Math.floor(Math.random() * i), x = deck[--i], deck[i] = deck[j], deck[j] = x);
        return deck;
    }



    $scope.clickCard = function (card) {


        //Valdation: Prevents a card from begin 'seleted' more than once
        var found = false;

        //Ensure selected card is NOT currently in selectedCards array: sets Found to True if card is seleted twice
        for (var i = 0; i < $scope.selectedCards.length; i++) {
            if ($scope.selectedCards[i].id === card.id) {
                found = true;
            }
        }
        //Validation: prevents more than 2 cards 'flipped' over at once 
        //Found must be set to 'False' to run
        if (!card.disabled && $scope.selectedCards.length < 2 && !found) {
            card.flipped = !card.flipped;

            //Add selected card to selected card Array
            $scope.selectedCards.push(card);
           //Testing:  $scope.Clicks++;
            ClickCountHandler();
            //If 2 cards selected (flipped over)
            if ($scope.selectedCards.length == 2) {

                //If both selectedCards match, set card.disabled = true;
                if ($scope.selectedCards[0].value == $scope.selectedCards[1].value) {
                   //Testing:  $scope.PairsFound++;
                    PairFoundCountHandler();
                    $scope.selectedCards[0].disabled = true;
                    $scope.selectedCards[1].disabled = true;

                    //Clear selectedCards array once a pair is found
                    $scope.selectedCards = [];
                } else {
                    //No Match
                    //leave flipped for 1 second, then flip over
                    $timeout(function () {
                        $scope.selectedCards[0].flipped = false;
                        $scope.selectedCards[1].flipped = false;
                        TurnHandler();

                        //Clear selected Card array once cards are flipped=false
                        $scope.selectedCards = [];
                    }, 1000)
                }
            }
        }
    };
    
    function TurnHandler(){
        if($scope.PlayerTurn == "Player 2"){
            $scope.PlayerTurn = "Player 1";
        }
        else{
            $scope.PlayerTurn = "Player 2"; 
        }
    }
    
    //Click Count Handler
    function ClickCountHandler(){
        if($scope.PlayerTurn == "Player 1"){
            $scope.Player1Clicks++;
        } else{
            $scope.Player2Clicks++;
        }
    }
    
    function clearCounts(){
        $scope.Player1Clicks = 0;
        $scope.Player2Clicks =0;
        $scope.Player1PairsFound = 0;
        $scope.Player2PairsFound = 0;     
    }
    
    //Pair Found Count Handler
    function PairFoundCountHandler(){
            if($scope.PlayerTurn == "Player 1"){
            $scope.Player1PairsFound++;
        } else{
            $scope.Player2PairsFound++;
        }
    }
    
    

    //Sticky
    function sticky_relocate() {
        var window_top = $(window).scrollTop();
        var div_top = $('#sticky-anchor').offset().top;
        if (window_top > div_top) {
            $('#sticky').addClass('stick')
            
        } else {
            $('#sticky').removeClass('stick');
        }
    }

    $(function () {
        $(window).scroll(sticky_relocate);
        sticky_relocate();
    });


}); //End Controller