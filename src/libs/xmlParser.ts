import { xml2js } from "xml-js";
import { ILibrary, IXML, IArtist, ISong } from "datatypes/types";
import { getFirstChar } from "./helpers";

export default (xml: string): ILibrary =>
  prepareDataType(xml2js(xml, {
    compact: true,
    attributesKey: "attributes"
  }) as IXML.IBaseXml);

const prepareDataType = (data: IXML.IBaseXml): ILibrary => {
  let preparedCollection: ILibrary = {
    artists: new Map(),
    songs: new Map()
  };
  if (Array.isArray(data.Library.Artist)) {
    data.Library.Artist.forEach((artist: any) => {
      let newArtist: IArtist = {
        name: artist.attributes.name,
        songs: []
      };
      if (Array.isArray(artist.Song)) {
        artist.Song.forEach((song: IXML.IAttributes) => {
          addSongToCollection(
            song.attributes.name,
            +song.attributes.id,
            +song.attributes.duration,
            newArtist.name,
            preparedCollection.songs
          );
          newArtist.songs.push(+song.attributes.id);
        });
      } else {
        addSongToCollection(
          artist.Song.attributes.name,
          +artist.Song.attributes.id,
          +artist.Song.attributes.duration,
          newArtist.name,
          preparedCollection.songs
        );
        newArtist.songs.push(+artist.Song.attributes.id);
      }

      preparedCollection.artists.set(newArtist.name, newArtist);
    });
  }
  return preparedCollection;
};

const addSongToCollection = (
  name: string,
  id: number,
  duration: number,
  artist: string,
  collection: Map<string, ISong[]>
): Map<string, ISong[]> => {
  let newSong: ISong = {
    name,
    id,
    duration,
    artist
  } as ISong;
  let firstCharacter = getFirstChar(newSong.name);
  let currentSongsCollection = collection.get(firstCharacter);

  if (!Array.isArray(currentSongsCollection)) {
    currentSongsCollection = [];
  }

  currentSongsCollection.push(newSong);
  collection.set(getFirstChar(newSong.name), currentSongsCollection);
  return collection;
};
