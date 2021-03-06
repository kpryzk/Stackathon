module Main exposing (Card, Model, Msg(..), buildErrorMessage, cardDecoder, init, main, requestThree, update, view, viewCard, viewCards, viewCardsOrError, viewError)

import Browser
import Html exposing (..)
import Html.Attributes exposing (class, src)
import Html.Events exposing (onClick)
import Http
import Json.Decode as Decode
    exposing
        ( Decoder
        , decodeString
        , field
        , int
        , list
        , map5
        , string
        )


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { cards = []
      , errorMessage = Nothing
      }
    , Cmd.none
    )


type alias Card =
    { id : Int
    , name : String
    , imageUrl : String
    , meaning_rev : String
    , meaning_up : String
    }


type alias Model =
    { cards : List Card
    , errorMessage : Maybe String
    }


view : Model -> Html Msg
view model =
    div [ class "app-container" ]
         text "My, what a spooky, esoteric app. Almost as esoteric as Elm, the functional programming language in which it was built. Draw a card - find your fate - or draw three! They could represent past, present, and future... or perhaps just your inherent indecison. Your fate is in the stars... or the SQL randomize function."
        , viewCardsOrError model
        , div [ class "button-container" ]
            [ div [ class "draw-one button" ]
                [ button
                    [ onClick DrawOne ]
                    [ text "DRAW ONE" ]
                ]
            , div [ class "draw-three button" ]
                [ button [ onClick DrawThree ]
                    [ text "DRAW THREE" ]
                ]
            ]
        ]


viewCardsOrError : Model -> Html Msg
viewCardsOrError model =
    case model.errorMessage of
        Just message ->
            viewError message

        Nothing ->
            viewCards model.cards


viewError : String -> Html Msg
viewError errorMessage =
    div []
        [ text ("Error: " ++ errorMessage)
        ]


viewCards : List Card -> Html Msg
viewCards cards =
    div [ class "card-container" ]
        [ table [ class "card-table" ]
            (List.indexedMap viewCard cards)
        ]


viewCard : Int -> Card -> Html Msg
viewCard idx card =
    tr [ class ("individual-card-" ++ String.fromInt idx) ]
        [ img [ src card.imageUrl ] []
        , h1 [ class "card-name" ] [ text card.name ]
        , h3 [ class "meaning" ] [ text card.meaning_up ]
        ]


type Msg
    = DrawThree
    | DrawOne
    | DataReceived (Result Http.Error (List Card))


cardDecoder : Decoder Card
cardDecoder =
    map5 Card
        (field "id" int)
        (field "name" string)
        (field "imageUrl" string)
        (field "meaning_rev" string)
        (field "meaning_up" string)


requestThree : Cmd Msg
requestThree =
    Http.get
        { url = "http://localhost:5885/api/tarot/randomThree"
        , expect = Http.expectJson DataReceived (list cardDecoder)
        }


requestOne : Cmd Msg
requestOne =
    Http.get
        { url = "http://localhost:5885/api/tarot/randomCard"
        , expect = Http.expectJson DataReceived (list cardDecoder)
        }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        DrawThree ->
            ( model, requestThree )

        DrawOne ->
            ( model, requestOne )

        DataReceived (Ok cards) ->
            ( { model
                | cards = cards
                , errorMessage = Nothing
              }
            , Cmd.none
            )

        DataReceived (Err httpError) ->
            ( { model
                | errorMessage = Just (possibleErrors httpError)
              }
            , Cmd.none
            )


possibleErrors : Http.Error -> String
possibleErrors httpError =
    case httpError of
        Http.BadUrl message ->
            message

        Http.Timeout ->
            "Timeout error!"

        Http.NetworkError ->
            "Server unavailable!"

        Http.BadStatus statusCode ->
            String.fromInt statusCode

        Http.BadBody message ->
            message
