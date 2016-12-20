import {Citation} from '../../models/citation';
/**
 * Created by baunov on 19/12/16.
 */

export interface CitationState
{
  citation: Citation;
  loading: boolean;
  loaded: boolean;
  error: Error;
}

export interface CitationListState
{
  citations: Citation[];
  loading: boolean;
  loaded: boolean;
  error: Error;
}

export interface AppState
{
  homePage: {
    citation: CitationState
  },
  profilePage: {
    userCitations: CitationListState,
    favouriteCitations: CitationListState
  },
  userPage: {
    userCitations: CitationListState
  },
  feedPage: {
    citations: CitationListState
  }
}
