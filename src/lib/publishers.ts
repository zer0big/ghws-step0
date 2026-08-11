/**
 * Data-access helpers for publisher records.
 *
 * These functions query the SQLite database via Drizzle using an injectable
 * database instance so they can be reused in pages and tests.
 */

import { asc } from 'drizzle-orm';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';
import type { Database } from './db';

/**
 * Returns all publishers ordered by name.
 *
 * @param db Drizzle database instance.
 * @returns A list of publishers containing each publisher id and name.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select({
            id: publishers.id,
            name: publishers.name,
        })
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map((row) => ({
        id: row.id,
        name: row.name,
    }));
}