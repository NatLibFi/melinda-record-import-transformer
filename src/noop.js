/**
*
* @licstart  The following is the entire license notice for the JavaScript code in this file.
*
* Transformer microservice of Melinda record batch import system
*
* Copyright (C) 2018 University Of Helsinki (The National Library Of Finland)
*
* This file is part of melinda-record-import-transformer
*
* melinda-record-import-transformer program is free software: you can redistribute it and/or modify
* it under the terms of the GNU Affero General Public License as
* published by the Free Software Foundation, either version 3 of the
* License, or (at your option) any later version.
*
* melinda-record-import-transformer is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Affero General Public License for more details.
*
* You should have received a copy of the GNU Affero General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
*
* @licend  The above is the entire license notice
* for the JavaScript code in this file.
*
*/

'use strict';

import validateFactory from '@natlibfi/marc-record-validators-melinda';
import { checkEnv, registerSignalHandlers, startHealthCheckService, startTransformation } from './utils';

export default async function() {

  registerSignalHandlers();
  checkEnv();

  const stopHealthCheckService = startHealthCheckService();

  try {
    const validate = validateFactory({
      validators: ['double-commas'],
      failOnError: false,
      fix: true
    });

    await startTransformation(transform);
    stopHealthCheckService();
  } catch (error) {
    stopHealthCheckService();
    throw error;
  }

  // No-op
  async function transform(blob) {
    // This would contain the actual records
    const records = [];
    // This would be called for actual records
    //return records.map(validate);
    return records;
  }
}
