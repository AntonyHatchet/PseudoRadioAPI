import IArtist from "./IArtist";
import ISong from "./ISong";

/**
 * Represents a loaded songs and artists.
 */
interface ILibrary {
  artists: Map<string, IArtist>;
  songs: Map<string, ISong[]>;
}

export default ILibrary;
