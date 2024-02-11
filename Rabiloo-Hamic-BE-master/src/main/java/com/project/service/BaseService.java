package com.project.service;

import com.project.response.BaseResponse;

public interface BaseService<R extends BaseResponse,T> {

	R findAll();
	R findOne(Long id);
	R create(T req);
	R update(T req);
	R delete(Long id);
}
