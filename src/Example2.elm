module Main exposing (Card, Model, Msg(..), buildErrorMessage, cardDecoder, init, main, requestThree, update, view, viewCard, viewCards, viewCardsOrError, viewError, viewTableHeader)

import Browser
import Html exposing (..)
import Html.Attributes exposing (src)
import Html.Events exposing (onClick)
import Http
import Json.Decode as Decode
    exposing
        ( Decoder
        , decodeString
        , field
        , int
        , list
        , map3
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
    }


type alias Model =
    { cards : List Card
    , errorMessage : Maybe String
    }


view : Model -> Html Msg
view model =
    div []
        [ button [ onClick DrawThree ]
            [ text "Draw Three" ]
        , button [ onClick DrawOne ]
            [ text "Draw One" ]
        , viewCardsOrError model
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
    let
        errorHeading =
            "Couldn't fetch data at this time."
    in
    div []
        [ h3 [] [ text errorHeading ]
        , text ("Error: " ++ errorMessage)
        ]


viewCards : List Card -> Html Msg
viewCards cards =
    div []
        [ h3 [] [ text "Cards" ]
        , table []
            ([ viewTableHeader ] ++ List.map viewCard cards)
        ]


viewTableHeader : Html Msg
viewTableHeader =
    tr []
        [ th []
            [ text "ID" ]
        , th []
            [ text "Name" ]
        , th []
            [ text "Image URL" ]
        ]


viewCard : Card -> Html Msg
viewCard card =
    tr []
        [ td []
            [ text (String.fromInt card.id) ]
        , td []
            [ text card.name ]
        , td []
            [ text card.imageUrl ]
        ]


type Msg
    = DrawThree
    | DrawOne
    | DataReceived (Result Http.Error (List Card))


cardDecoder : Decoder Card
cardDecoder =
    map3 Card
        (field "id" int)
        (field "name" string)
        (field "imageUrl" string)


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
                | errorMessage = Just (buildErrorMessage httpError)
              }
            , Cmd.none
            )


buildErrorMessage : Http.Error -> String
buildErrorMessage httpError =
    case httpError of
        Http.BadUrl message ->
            message

        Http.Timeout ->
            "Server is taking too long to respond. Please try again later."

        Http.NetworkError ->
            "Unable to reach server."

        Http.BadStatus statusCode ->
            "Request failed with status code: " ++ String.fromInt statusCode

        Http.BadBody message ->
            message
